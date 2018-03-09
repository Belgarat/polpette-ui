#!/bin/bash
FILE="build"
SRC=./dist
SITE="www.stdout.it"
DST="/var/www/polpette/"

#build tar
tar czvf /tmp/$FILE.tar.gz $SRC

#transfer file on server
scp /tmp/$FILE.tar.gz root@$SITE:$DST

#clean dst dir
ssh root@$SITE rm -f $DST/dist/*

#decompress tar file
ssh root@$SITE tar xzvf $DST$FILE.tar.gz -C $DST

#clean file
rm /tmp/$FILE.tar.gz
ssh root@$SITE rm -f $DST/$FILE.tar.gz
