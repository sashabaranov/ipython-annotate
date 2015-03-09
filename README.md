To add custom content to the notebook server, you need to create an IPython user profile. Do this by running:

```bash
ipython profile create
cd $(ipython locate profile)
```
In this new directory, you need to make a subdirectory named static/custom
Copy my_extension.js and custom.js there.