chrome.storage.sync.get("options", function(settings) {
    
    const pipelineSelector = document.getElementById("pipelines_selector_pipelines");
    pipelineSelector.style.backgroundColor = settings.options.backgroundColour;
    
    const pipelineGroups = pipelineSelector.getElementsByClassName("selector_group");
   
    const pipelineFilter = settings.options.pipelinesFilter;
    
    for(var i = 0; i < pipelineGroups.length; i++) {
        var pipelineGroup = pipelineGroups[i];     

        if (pipelineGroup.id.toLowerCase().indexOf(pipelineFilter) === -1){
            pipelineGroup.style.display = 'none';
        }
    }
});