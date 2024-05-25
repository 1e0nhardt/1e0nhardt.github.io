---
icon: pen-to-square
date: 2024-05-11
sticky: false
star: false
comment: true
category:
  - blog
tags:
  - ai
  - godot
description: GPTSoVITS UI
---
# GPTSoVITS UI
## websocket交互
### 模型训练
#### 接受信息
```json
{
	"type": "tts_train",
	"task_id": 1, // Godot客户端负责管理任务创建
}
```
1. 语音转文字工具。
2. 打标工具。
3. 伴奏分离工具。
#### 返回信息
```json
{

}
```

### 模型推理
#### 接受信息
```json
{
	"type": "tts_infer",
	"task_id": 1, // Godot客户端负责管理任务创建
	"params": {
		"ref_wav_path": "fakepath/refer_audio.wav", 
		'prompt_text': "参考音频的文本", 
		'prompt_language': "中文", 
		'text': "需要合成的语音", 
		'text_language': "中文", 
		'how_to_cut': "不切", 
		'top_k': 20, 
		'top_p': 0.6, 
		'temperature': 1.0, 
		'ref_free': false, // 是否使用无参考音频模式
		"output_dir": "fakedir/",
		"output_name": "输出文件名", // 不要后缀，固定为wav
	}
}
```

1. 选择音频。
2. 输出音频。
3. 播放音频。记录信息。
4. 多次重复推理(抽卡)
5. 删除

#### 返回信息
```json
// 开始任务
{
	"type": "tts_infer",
	"task_id": 1,
	"task_progress": 0.0, // 文本切分后，可以知道大致进度
	"split_count": 5,
	""
}
```

### 模型切换
#### 接受信息
```json
{
	"type": "tts_model_change",
	"gpt_model": "path",
	"sovits_model": "path",
}
```

#### 返回信息

```json
{
	"type": "tts_model_change",
	"task_id": 1,
	"task_progress": 0.0 // 文本切分后，可以知道大致进度
}
```
## WAV格式
记录参数，模型信息。





