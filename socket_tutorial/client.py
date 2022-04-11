import socket


HEADER = 64
PORT = 5050
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"
SERVER = "172.27.4.111" # econet localhost (DESEN 102)
ADDR = (SERVER, PORT)

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)


def send(msg):
    # when sending messages we must encode into a byte-string
    message = msg.encode(FORMAT)
    msg_length = len(msg)
    send_length = str(msg_length).encode(FORMAT)
    # pads the message so it is the length of the HEADER
    send_length += b' ' * (HEADER - len(send_length))
    
    client.send(send_length)
    client.send(message)
    print(client.recv(HEADER).decode(FORMAT))
    
send("Hello World!")