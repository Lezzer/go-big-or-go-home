function save_options() {
    const backgroundColour = document.getElementById('background-colour').value;
    const pipelinesFilter = document.getElementById('pipelines-filter').value;
    
    var config = {
        options: {
            backgroundColour: backgroundColour,
            pipelinesFilter: pipelinesFilter
        }
    };
    
    chrome.storage.sync.set(config, function() {
        var status = document.getElementById('status');
        status.style.display = 'block';

        setTimeout(function() {
            status.style.display = 'none';
        }, 1000);

        chrome.runtime.reload();
    });
}

function restore_options() {
    chrome.storage.sync.get("options", function(settings) {
        
        const backgroundColourInputBox = document.getElementById("background-colour");
        backgroundColourInputBox.value = settings.options.backgroundColour;
        backgroundColourInputBox.style.backgroundColor = settings.options.backgroundColour;
        
        document.getElementById("pipelines-filter").value = settings.options.pipelinesFilter;
    });

    document.getElementById('save').addEventListener('click', save_options);
}
document.addEventListener('DOMContentLoaded', restore_options);
