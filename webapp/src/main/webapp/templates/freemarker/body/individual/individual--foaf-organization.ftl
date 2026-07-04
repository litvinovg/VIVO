<#-- $This file is distributed under the terms of the license in LICENSE$ -->

<#-- Individual profile page template for foaf:Organization individuals (extends individual.ftl in vivo)-->

<#-- Do not show the link for temporal visualization unless it's enabled -->

<#if temporalVisualizationEnabled 
  || mapOfScienceVisualizationEnabled 
  || isReportAuth("http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#f7e37336-93fe-41fb-acc4-ebcd8234e571")
  || isReportAuth("http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#d0b1ec8b-f0c0-4a04-9832-5caf67a9e2a0") >
    <#assign classSpecificExtension>
        <section id="right-hand-column" role="region">
            <#if temporalVisualizationEnabled>
                <#include "individual-visualizationTemporalGraph.ftl">
            </#if>
            <#if mapOfScienceVisualizationEnabled>
                <#include "individual-visualizationMapOfScience.ftl">
            </#if>
            <#if isReportAuth("http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#f7e37336-93fe-41fb-acc4-ebcd8234e571") >
                <#include "individual-organizationMetricsReport.ftl">
            </#if>
            <#if isReportAuth("http://vitro.mannlib.cornell.edu/ns/vitro/ApplicationSetup#d0b1ec8b-f0c0-4a04-9832-5caf67a9e2a0") >
                <#include "individual-organizationTrendsReport.ftl">
            </#if>
        </section> <!-- #right-hand-column -->
    </#assign>
</#if>

<#assign affiliatedResearchAreas>
    <#include "individual-affiliated-research-areas.ftl">
</#assign>

<#if individual.mostSpecificTypes?seq_contains("Academic Department") && getGrantResults?has_content>
    <#assign departmentalGrantsExtension>    
        <div id="activeGrantsLink">
        <img src="${urls.base}/images/individual/arrow-green.gif">
            <a href="${urls.base}/deptGrants?individualURI=${individual.uri}" title="${i18n().view_all_active_grants}">
                ${i18n().view_all_active_grants}
            </a>    
        </div>
    </#assign>
</#if>

<#include "individual.ftl">

