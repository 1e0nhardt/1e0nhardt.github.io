---
icon: pen-to-square
isOriginal: true
#author: Ms.Hope
date: 2023-06-11
sticky: false
star: false
comment: true
category:
  - programming
tag:
  - python
description: 颜值超高的python命令行输出美化工具
---

# rich 终端输出美化库
## 进度条
### 自定义进度条
```python
import time
from rich.progress import Progress

# 1.创建管理进度条的对象
progress = Progress()
progress.start()

# 2.添加一个task到progress对象
# 累积的advance除以total为当前进度条百分比。
# 一个task对应在终端中显示的一个进度条
task = progress.add_task('[blue]Training', total=1000)

for i in range(1000):
	...
	loss = 1 - i / 1000
	if i % 50 == 0:
		advance = 50 if i != 0 else 0
		# 3.手动更新进度条
		progress.update(task, advance=advance, description=f"[blue]loss={loss:.4f}")
progress.update(task, advance=advance, description=f"[green]Complete! loss={loss:.4f}")

# 4.终止进度条
progress.stop()
```

## 状态动画
```python
from time import sleep
    tasks = [1,2,3]
    with console.status("[bold green]Working on tasks...") as status:
        while tasks:
            task = tasks.pop(0)
            sleep(1)
            console.log(f"{task} complete")
```
