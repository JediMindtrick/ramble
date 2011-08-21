/**
 * Outputter Interface defines the methods all outputters should have.
 */


var CacheOutputter = function(){
	var Features = [];
	var currFeature = null;
	var currScenario = null;
	
	var toReturn =
	{
	    /**
	     * Start output for a suite of features
	     * @public
	     * @returns void
	     */
	    start: function() {},
	    /**
	     * Output a feature
	     * A Feature is basically a JUnit TestSuite
	     * @public
	     * @param Ramble.Feature a ramble feature object (defining .title and .description)
	     * @returns void
	     */
	    outputFeature: function(feature) {
	    	//we'd already previously started a feature...meaning this one is a new one...push old one onto the stack
	    	if(currFeature !== null){
	    		Features.push(currFeature);
	    		currFeature = null;
	    	}
	    	
	    	currFeature = {};
	    	currFeature.title = feature.title;
	    	currFeature.description = feature.description;
	    	currFeature.Scenarios = [];
	    },
	    /**
	     * Output a scenario
	     * A Scenario is basically a JUnit TestCase
	     * @public
	     * @param Ramble.Scenario a ramble scenario object (defining .title)
	     * @returns void
	     */
	    outputScenario: function(scenario) {
	    	if(currScenario !== null){
	    		currFeature.Scenarios.push(currScenario);
	    		currScenario = null;
	    	}
	    	currScenario = {};
	    	currScenario.title = scenario.title;
	    	currScenario.Steps = [];
	    },
	    /**
	     * Output a step
	     * @public
	     * @param String step the string of the step definition
	     * @param String status the pass / fail / null status of the test
	     * @returns void
	     */
	    outputStep: function(step, status) {
	    	var toAdd = {};
	    	toAdd.status = step.status;
	    	toAdd.text = step.text;
	    	toAdd.error = step.error;
	    	if (toAdd.status == "missing") {
	    		var example = Ramble.Parser.getExampleCode(step, true)
	    		example = example.replace(/<br>/g,'\n');
	    		example = example.replace(/<br\/>|<pre>|<\/pre>|<code>|<\/code>/g,'');
	    		
//	    		"Missing step definition:<br/><pre><code>ramble.match(/^the heading should be "([^"]*)"$/, function(arg1) {

	            toAdd.exampleCode = example; 
        	}
	    	currScenario.Steps.push(toAdd);
	    },
	    /**
	     * Stop output for a suite of features
	     * @public
	     * @returns void
	     */
	    stop: function() {
	    	
	    	if(currScenario!== null){
	    		currFeature.Scenarios.push(currScenario);
	    		currScenario = null;
	    	}
	    	
	    	if(currFeature !== null){
	    		Features.push(currFeature);
	    		currFeature = null;
	    	}
	    },
	    getResults : function(){
	    	return Features;
	    }
	};
	
	return toReturn;
};