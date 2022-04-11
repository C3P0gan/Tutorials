import socket
import threading


HEADER = 64
PORT = 5050
# Run <ipconfig> on terminal -> Ethernet adapter Ethernet: IPv4 Address: 172.27.4.111
SERVER = socket.gethostbyname(socket.gethostname()) # localhost ipv4
ADDR = (SERVER, PORT)
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Create the socket
server.bind(ADDR) # Bind the socket to the address


def handle_client(conn, addr):
    '''Handles all the communications between Client and Server.'''
    print(f"[NEW CONNECTION] {addr} connected.")
    
    connected = True
    while connected:
        # tells us how long the incoming message is
        msg_length = conn.recv(HEADER).decode(FORMAT) # blocking line of code
        
        # the first message when connects is invalid/blank
        if msg_length:
            # converts the length into an integer
            msg_length = int(msg_length)
            # actual message
            msg = conn.recv(msg_length).decode(FORMAT)
            
            if msg == DISCONNECT_MESSAGE:
                connected = False
                
            print(f"[{addr}] {msg}")
            conn.send("Msg received".encode(FORMAT))
        
    conn.close()

def start():
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        # conn = socket object that enables data transferring
        # addr = information about the connection (IP, Port, etc.)
        conn, addr = server.accept() # blocking line of code
        # creates a thread for each new connection
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
        
        print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")
        

print("[STARTING] server is starting...")
start()