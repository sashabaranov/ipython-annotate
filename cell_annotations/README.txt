To add custom content to the notebook server, you need to create an IPython user profile. Do this by running:

ipython profile create
cd $(ipython locate profile)

In this new directory, you need to make a subdirectory named static/custom
Copy annotation.js, context.js and custom.js there
