
check:
	terraform -version
	node -v
	cdktf --version

init:
	cdktf init --template="typescript" --providers="aws@~>4.65"