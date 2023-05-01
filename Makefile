
check:
	terraform -version
	node -v
	cdktf --version

init:
	cd typescript-aws-stack; \
	cdktf init --template="typescript" --providers="aws@~>4.65"

deploy:
	cd typescript-aws-stack; \
	cdktf deploy

destroy:
	cd typescript-aws-stack; \
	cdktf destroy