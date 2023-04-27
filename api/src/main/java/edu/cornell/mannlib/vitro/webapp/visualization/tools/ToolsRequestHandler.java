/* $This file is distributed under the terms of the license in LICENSE$ */

package edu.cornell.mannlib.vitro.webapp.visualization.tools;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;

import org.apache.jena.query.Dataset;

import edu.cornell.mannlib.vitro.webapp.auth.permissions.SimplePermissions;
import edu.cornell.mannlib.vitro.webapp.auth.requestedAction.ActionRequest;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.ResponseValues;
import edu.cornell.mannlib.vitro.webapp.controller.freemarker.responsevalues.TemplateResponseValues;
import edu.cornell.mannlib.vitro.webapp.visualization.exceptions.MalformedQueryParametersException;
import edu.cornell.mannlib.vitro.webapp.visualization.visutils.VisualizationRequestHandler;

public class ToolsRequestHandler implements VisualizationRequestHandler {

	public static final ActionRequest REQUIRED_ACTIONS = SimplePermissions.REFRESH_VISUALIZATION_CACHE.actionRequest;

	@Override
	public Object generateAjaxVisualization(VitroRequest vitroRequest, Log log,
			Dataset dataSource) throws MalformedQueryParametersException {
		throw new UnsupportedOperationException("Visualization Tool does not provide Ajax Response.");
	}

	@Override
	public Map<String, String> generateDataVisualization(
			VitroRequest vitroRequest, Log log, Dataset dataset)
			throws MalformedQueryParametersException {
		throw new UnsupportedOperationException("Visualization Tool does not provide Data Response.");
	}

	@Override
	public ResponseValues generateStandardVisualization(
			VitroRequest vitroRequest, Log log, Dataset dataSource)
			throws MalformedQueryParametersException {
		return renderToolsMenu(vitroRequest, log, dataSource);
	}

	@Override
	public ResponseValues generateVisualizationForShortURLRequests(
			Map<String, String> parameters, VitroRequest vitroRequest, Log log,
			Dataset dataSource) throws MalformedQueryParametersException {

		return renderToolsMenu(vitroRequest, log, dataSource);
	}

	@Override
	public ActionRequest getRequiredPrivileges() {
		return REQUIRED_ACTIONS;
	}

	private ResponseValues renderToolsMenu(VitroRequest vitroRequest,
			Log log, Dataset dataSource) {

		String standaloneTemplate = "tools.ftl";

		Map<String, Object> body = new HashMap<String, Object>();
		body.put("title", "Visualization Tools");

		return new TemplateResponseValues(standaloneTemplate, body);
	}

}
