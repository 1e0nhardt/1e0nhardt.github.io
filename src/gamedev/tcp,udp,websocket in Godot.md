---
icon: pen-to-square
date: 2023-11-02
sticky: false
star: false
comment: true
category:
  - Blog
tag:
  - godot
description: tcp,udp,websocket in Godot
---

# tcp,udp,websocket in Godot
## UDPServer
用来接受来自其他程序的UDP数据包。是基于PacketPeerUDP封装的类。

### 基础使用代码
```js
extends Node

const UDP_IP = "127.0.0.1"
const UDP_PORT = 4243

var server := UDPServer.new()


func _ready():
    set_process(false)
    # 开启监听端口
    server.listen(UDP_PORT)
    set_process(true)


func _notification(what):
    if what == NOTIFICATION_WM_CLOSE_REQUEST:
        server.stop()
	    set_process(false)
        get_tree().quit()


func _process(_delta):
    # 接受数据包
    server.poll()
    if server.is_connection_available():
        var peer : PacketPeerUDP = server.take_connection()
        var packet : PackedByteArray = peer.get_packet()

        print("Accepted peer: %s:%s" % [peer.get_packet_ip(), peer.get_packet_port()])
        print("Received data: %s" % [packet.get_string_from_utf8()])
```


### PacketPeerUDP使用示例
```js
extends Node

var udp := PacketPeerUDP.new()
var connected = false

func _ready():
    udp.connect_to_host("127.0.0.1", 4242) # 确定目标

func _process(delta):
    if !connected:
        # Try to contact server
        udp.put_packet("The answer is... 42!".to_utf8_buffer()) # 发包
    if udp.get_available_packet_count() > 0:
        print("Connected: %s" % udp.get_packet().get_string_from_utf8()) # 收包
        connected = true
```

### python 客户端代码
```python
import socket
import json
import time

opened_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
UDP_IP = "127.0.0.1"
UDP_PORT = 4243
lastChat = []

def main():
    first = True
    count = 0
    while True:
        if first: # 第一次可以将进程id发过去
            send_chat(["PIDs", "Greetings! 9527"])
            first = False
        
        count += 1
        send_chat(["CHAT", f"Hello from python {count}"])
        time.sleep(3) # Reduce CPU Usage

def send_chat(chat): # 发包
    byte_message = bytes(json.dumps(chat), "utf-8")
    opened_socket.sendto(byte_message, (UDP_IP, UDP_PORT))


if __name__ == "__main__":
    main()

```

## TCP
### StreamPeerTCP
```js
extends Node

var tcp_stream := StreamPeerTCP.new()
var status := 0

func _ready():
    status = tcp_stream.get_status()
    print(status)
    # tcp_stream.bind(8083)
    connect_to_host("127.0.0.1", 50007)

func _process(_delta: float):
    tcp_stream.poll() # 需要手动拉取socket，否则status会一直是STATUS_CONNECTING
    var new_status: int = tcp_stream.get_status()
    if new_status != status:
        status = new_status
        match status:
            tcp_stream.STATUS_NONE:
                print("Disconnected from host.")
            tcp_stream.STATUS_CONNECTING:
                print("Connecting to host.")
            tcp_stream.STATUS_CONNECTED:
                print("Connected to host.")
            tcp_stream.STATUS_ERROR:
                print("Error with socket stream.")

    if status == tcp_stream.STATUS_CONNECTED:
        var available_bytes: int = tcp_stream.get_available_bytes()
        if available_bytes > 0:
            print("available bytes: ", available_bytes)
            var data: Array = tcp_stream.get_partial_data(available_bytes)
            # Check for read error.
            if data[0] != OK:
                print("Error getting data from stream: ", data[0])
            else:
                print("Data", data[1].get_string_from_utf8())

func connect_to_host(host: String, port: int):
    print("Connecting to %s:%d" % [host, port])
    # Reset status so we can tell if it changes to error again.
    status = tcp_stream.STATUS_NONE
    if tcp_stream.connect_to_host(host, port) != OK:
        print("Error connecting to host.")

func send(data: PackedByteArray) -> bool:
    if status != tcp_stream.STATUS_CONNECTED:
        print("Error: Stream is not currently connected.")
        return false
    var error: int = tcp_stream.put_data(data)
    if error != OK:
        print("Error writing to stream: ", error)
        return false
    return true
```

### python 客户端代码
```python
import socket
import time


# address = ('127.0.0.1', 8083)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('127.0.0.1', 50007))

#最大连接数
s.listen(5)

#客户处理线程
def handle_client(client_socket: socket.socket):

    # request = client_socket.recv(1024)
    # print("[*] Received: %s" % request)
    #向客户端返回数据
    try:
        client_socket.send("hi~".encode())
    except ConnectionAbortedError:
        print(f"Disconnect with {client_socket.getpeername()}")
        return

    time.sleep(0.5)


while True:
    #等待客户连接，连接成功后，将socket对象保存到client，将细节数据等保存到addr
    client, addr = s.accept()
    print("[*] Acception connection from %s:%d" % (addr[0],addr[1]))

    while True:
        # client_handler = threading.Thread(target=handle_client,args=(client,))
        # client_handler.start()
        handle_client(client)

```

## Websocket
### WebsocketPeer
```js
extends Node

var socket = WebSocketPeer.new()

@onready var send_button: Button = $Button

func _ready():
    socket.connect_to_url("ws://localhost:5000")
    send_button.pressed.connect(on_pressed)

func _process(_delta):
    socket.poll()
    var state = socket.get_ready_state()
    if state == WebSocketPeer.STATE_OPEN:
        while socket.get_available_packet_count():
            var pkt = socket.get_packet()
            print("Packet: ", pkt)
            $RichTextLabel.text = "Packet: %s" % pkt.get_string_from_utf8()
    elif state == WebSocketPeer.STATE_CLOSING:
        # Keep polling to achieve proper close.
        pass
    elif state == WebSocketPeer.STATE_CLOSED:
        var code = socket.get_close_code()
        var reason = socket.get_close_reason()
        print("WebSocket closed with code: %d, reason %s. Clean: %s" % [code, reason, code != -1])
        set_process(false) # Stop processing.

func on_pressed():
    print($LineEdit.text)
    socket.send_text($LineEdit.text)
```

### python 客户端代码
```python
import asyncio
import websockets # pip install websocket

async def server(ws, path):
    async for msg in ws:
        # msg = msg.decode("utf-8")
        print(f"Msg from client: {msg}")
        data = f"Got our msg: {msg}".encode("utf-8")
        print(data)
        await ws.send(data)

start_server = websockets.serve(server, "localhost", 5000)
print("Server started")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
```

## 意外收获
GDScript stores values in `Variant`, which is what allows GDScript to be dynamically typed. `Variant` has a 16 byte payload, with 4 bytes of information about what that payload is, so it is 20 bytes, but is padded to 24 bytes on a modern 64-bit system. So, a GDScript int is 3 times the size of `int64`. This may change with typed instructions in Godot 4+.

一个var占24bytes。如果声明了类型则只占类型所需的bytes。