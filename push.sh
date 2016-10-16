#!/bin/bash
echo -e "\nPushing To Master Branch..\n"
git add *
git commit -m $1
git push origin master
echo -e "\nFinished."