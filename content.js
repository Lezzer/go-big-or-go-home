function syncOptionsToPage(filterPage) {
    chrome.storage.sync.get("options", function(settings) {

        var pipelinesFilter = settings.options.pipelinesFilter;
        var pipelinesFilterArray = pipelinesFilter.split(";");
        
        formatPipelinesDropDown(settings, pipelinesFilterArray);
        
        if (filterPage)
            hidePipelineGroupsOnPage(pipelinesFilterArray);
    });
}

function formatPipelinesDropDown(settings, pipelinesFilterArray) {
        const pipelineSelector = document.getElementById("pipelines_selector_pipelines");
        pipelineSelector.style.backgroundColor = settings.options.backgroundColour;

        const pipelineGroups = pipelineSelector.getElementsByClassName("selector_group");
        for(var i = 0; i < pipelineGroups.length; i++) {
            var pipelineGroup = pipelineGroups[i];
            if (!isInPipelineFilterArray(pipelineGroup.id.toLowerCase(), pipelinesFilterArray)){
                pipelineGroup.style.display = 'none';
            }
        }
}

function hidePipelineGroupsOnPage(pipelinesFilterArray) {
    const pagePipelineGroups = document.getElementById("pipeline_groups_container");
    for(var i = 0; i < pagePipelineGroups.childNodes.length; i++) {
        var pipelineGroup = pagePipelineGroups.children[i];
        if (!isInPipelineFilterArray(pipelineGroup.id, pipelinesFilterArray)){
            pipelineGroup.style.display = 'none';
        }
    }

}

function isInPipelineFilterArray(id, pipelineFilterArray) {
    for(var i = 0; i < pipelineFilterArray.length; i++) {
        var filter = pipelineFilterArray[i];
        if (id.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            return true;
        }
    }
    return false;
}

syncOptionsToPage(true);
setInterval(syncOptionsToPage, 5000);