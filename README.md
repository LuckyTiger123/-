# 项目实训

## git基础说明

### git 创建分支

``` shell
git checkout -b (mybranch)
# -b 表示切换到这个分支
```



### git 上传提交

保存到暂存区

``` shell
git add (你想提交的文件到暂存区)
```

提交

``` shell
git commit -sv
```

进入编辑文本框

``` shell
# (你的分支)：(分支改动)
# (详细改动)

# example.
master:add readme.md
Add readme.md and describe how to use git roughly.
```

按esc之后输入“:wq”，即可完成提交。



当然，如果你觉得麻烦，可以用简单的提交方式

```bash
git commit -m "(具体的注释)"
```



### git进行更新与合并

- git pull

  git pull 会把关联的远程分支进行下载，同时在这个分支上进行git rebase

- git merge

  用merge来合并需要本地有另外一个待合并的分支，可以使用git checkout 或者 git fetch获得相应分支，然后使用git merge来进行合并

- git rebase(建议使用)

  与merge有点像，但可以保证分支更加干净，rebase后的分支push时冲突的可能性会变小

  

  以拉取master分支为例：

  ```bash
  git pull origin master -r
  ```

### tips

- 不是所有的文件都需要commit的，你只需要add和commit你想修改的文件

- .gitignore下输入文件的路径，这个文件的修改会被忽略

- 只有在你暂存区干净的时候才可以进行pull或者checkout到别的分支，如果你有本地改动，又想切换成其他分支，可以使用

  ``` shell
  # 本地修改进入入栈，可使本地变更干净
  git stash
  # 从栈中取回
  git stash pop
  ```

  当然也可以使用git diff > (输出文件)，然后checkout最后apply的方法，这个想用自己搜索

  想要回滚使用revert而不应该使用reset，否则你push上去的代码会缺失原本存在的commit

  

