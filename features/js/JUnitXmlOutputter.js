

Ramble.JUnitOutputter = function(){
	//this is merely the root
	var ResultsXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
						+ "<testsuites>"
						+ "</testsuites>";
	
	
	
	var toReturn =
	{
	    /**
	     * Start output for a suite of features
	     * @public
	     * @returns void
	     */
	    start: function() {},
	    /**
	     * Output a step
	     * A Feature is essentially a JUnit TestSuite
	     * @public
	     * @param Ramble.Feature a ramble feature object (defining .title and .description)
	     * @returns void
	     */
	    outputFeature: function(feature) {
	    	case "testcase":
                    
                        xml = "<testsuite name=\"" + feature.title + "\" tests=\"" + results.total + "\" failures=\"" + results.failed + "\" time=\"" + (results.duration/1000) + "\">";
                        
                        for (var prop in results){
                            if (results.hasOwnProperty(prop)){
                                if (results[prop] && typeof results[prop] == "object" && !(results[prop] instanceof Array)){
                                    xml += serializeToJUnitXML(results[prop]);
                                }
                            }
                        }            
                        
                        xml += "</testsuite>";
	    	
	    },
	    /**
	     * Output a step
	     * @public
	     * @param Ramble.Scenario a ramble scenario object (defining .title)
	     * @returns void
	     */
	    outputScenario: function(scenario) {},
	    /**
	     * Output a step
	     * @public
	     * @param String step the string of the step definition
	     * @param String status the pass / fail / undefined status of the test
	     * @returns void
	     */
	    outputStep: function(step, status) {},
	    /**
	     * Stop output for a suite of features
	     * @public
	     * @returns void
	     */
	    stop: function() {},
	    getResults: function(){
	    	
	    }
	};
	
	return toReturn;
};