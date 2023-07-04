git add .

git commit -a

git push origin $(git symbolic-ref HEAD 2> /dev/null | awk 'BEGIN{FS="refs/heads/"} {print $NF}')
