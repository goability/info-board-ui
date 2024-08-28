from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow all origins
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')

        super().end_headers()

def run(server_class=HTTPServer, handler_class=CORSRequestHandler, port=9000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print("Starting server on port ",port)
    httpd.serve_forever()

if __name__ == "__main__":
    run()
