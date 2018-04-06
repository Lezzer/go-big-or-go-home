chrome.storage.sync.get("options", function(settings) {
    const pipelineSelector = document.getElementById("pipelines_selector_pipelines");
    pipelineSelector.style.backgroundColor = settings.options.backgroundColour;
    
    const pipelineGroups = pipelineSelector.getElementsByClassName("selector_group");
    const pipelineFilterArray = settings.options.pipelinesFilter;
    
    for(var i = 0; i < pipelineGroups.length; i++) {
        var pipelineGroup = pipelineGroups[i];     
        if (!isInPipelineFilterArray(pipelineGroup.id.toLowerCase(), pipelineFilterArray)){
            pipelineGroup.style.display = 'none';
        }
    }
});

function isInPipelineFilterArray(id, pipelineFilterArray) {
    for(var i = 0; i < pipelineFilterArray.length; i++) {
        var filter = pipelineFilterArray[i];
        if (id.toLowerCase().indexOf(filter) !== -1) {
            return true;
        }
    }
    return false;
}