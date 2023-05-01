# Inpired by https://github.com/Vlaaaaaaad/gitpod-terraform/tree/main
# Big image but it's cached on gitpod nodes already
FROM gitpod/workspace-full:latest

# Install helper tools
RUN brew update && brew upgrade && brew install \
    pre-commit tfenv terraform-docs \
    tflint tfsec conftest \
    && brew install --ignore-dependencies cdktf \
    && brew cleanup

# Install Terraform via tfenv
RUN tfenv install latest && tfenv use latest

# Adding custom .bashrc for autocompletion
COPY .gitpod.bashrc /home/gitpod/.bashrc.d/custom
