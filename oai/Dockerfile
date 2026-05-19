FROM docker.io/eclipse-temurin:21-jdk as builder

ENV VIVO_URL=${VIVO_URL}

WORKDIR /tmp
RUN apt-get update && apt-get install -y ant unzip git maven
RUN git clone https://github.com/NCAR/joai-project

WORKDIR /usr/local
RUN curl --location 'https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.118/bin/apache-tomcat-9.0.118.tar.gz' | tar xz
RUN git clone https://github.com/litvinovg/rdf-to-openaire
RUN git clone https://github.com/litvinovg/joai-connector
RUN cd apache-tomcat* && echo "catalina.home=$(pwd)" > ~/build.properties
COPY . /tmp/joai-project

WORKDIR /tmp/joai-project
RUN ant dist
RUN mkdir /war

WORKDIR /war
RUN unzip /tmp/joai-project/dist/oai.war
RUN sed -i '/WEB-INF\/xsl_files/a\    <context-param>\n      <param-name>xslconverter - VIVO RDF/XML to openAIRE converter</param-name>\n      <param-value>rdf_to_openaire.xsl|rdf|openaire</param-value>\n    </context-param>' WEB-INF/web.xml

WORKDIR /usr/local/rdf-to-openaire
RUN mvn install
RUN cp src/main/resources/rdf_to_openaire.xsl /war/WEB-INF/xsl_files/

WORKDIR /usr/local/joai-connector
RUN mvn install

FROM docker.io/tomcat:9.0-jre21-temurin 

WORKDIR /usr/local/tomcat/webapps
RUN apt-get update && apt-get install -y cron
COPY --from=builder /war/ ./ROOT/
COPY --from=builder /usr/local/joai-connector/target/joai_connector.jar /usr/local/bin/
RUN \
  curl -L -o ../lib/woodstox-core-5.0.3.jar 'https://search.maven.org/remotecontent?filepath=com/fasterxml/woodstox/woodstox-core/5.0.3/woodstox-core-5.0.3.jar' && \
  curl -L -o ../lib/stax2-api-4.0.0.jar 'https://search.maven.org/remotecontent?filepath=org/codehaus/woodstox/stax2-api/4.0.0/stax2-api-4.0.0.jar' && \
  mkdir -p /joai/config/harvester /joai/config/repository && \
  ln -s /joai/config/harvester /usr/local/tomcat/webapps/ROOT/WEB-INF/harvester_settings_and_data && \
  ln -s /joai/config/repository /usr/local/tomcat/webapps/ROOT/WEB-INF/repository_settings_and_data

COPY crontab /joai/config/
RUN chmod 0744 /joai/config/crontab
RUN crontab -u root /joai/config/crontab

COPY get-data.sh /joai/config/
RUN chmod 0744 /joai/config/get-data.sh

COPY connector.properties /joai/config/
COPY start.sh /joai/config/
RUN chmod 0744 /joai/config/start.sh

COPY config/ /joai/config/repository/

WORKDIR /usr/local/tomcat

CMD ["/joai/config/start.sh"]

# just the config
VOLUME /joai/config

# the harvested/provided records
VOLUME /joai/data
