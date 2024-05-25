---
icon: pen-to-square
date: 2024-04-30
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: Hazel游戏引擎
---
# Hazel游戏引擎

```class Animal Example
Animal <|-- Duck
Animal <|-- Fish
Animal <|-- Zebra

Animal : +int age
Animal : +String gender
Animal: +isMammal()
Animal: +mate()
class Duck{
  +String beakColor
  +swim()
  +quack()
}
class Fish{
  -int sizeInFeet
  -canEat()
}
class Zebra{
  +bool is_wild
  +run()
}
```
