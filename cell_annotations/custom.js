$([IPython.events]).on('app_initialized.NotebookApp', function(){
        require(['custom/context', 'custom/annotation']);
});