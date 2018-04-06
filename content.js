function formatPipelinesDropDown() {
    chrome.storage.sync.get("options", function(settings) {
        const pipelineSelector = document.getElementById("pipelines_selector_pipelines");
        pipelineSelector.style.backgroundColor = settings.options.backgroundColour;

        const pipelineGroups = pipelineSelector.getElementsByClassName("selector_group");
        
        const pipelinesFilter = settings.options.pipelinesFilter;
        const pipelinesFilterArray = pipelinesFilter.split(";");
        
        for(var i = 0; i < pipelineGroups.length; i++) {
            var pipelineGroup = pipelineGroups[i];
            if (!isInPipelineFilterArray(pipelineGroup.id.toLowerCase(), pipelinesFilterArray)){
                pipelineGroup.style.display = 'none';
            }
        }
    });
}

function isInPipelineFilterArray(id, pipelineFilterArray) {
    for(var i = 0; i < pipelineFilterArray.length; i++) {
        var filter = pipelineFilterArray[i];
        if (id.toLowerCase().indexOf(filter) !== -1) {
            return true;
        }
    }
    return false;
}

formatPipelinesDropDown();
setInterval(formatPipelinesDropDown, 5000);