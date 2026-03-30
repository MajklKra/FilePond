import os
import uuid
from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5 MB

@app.route("/")
def index():
    return render_template("upload.html")

@app.route("/upload", methods=["POST"])
def upload():

    if not request.files:
        return "Žádný soubor nebyl přijat", 400

    file = next(iter(request.files.values()))

    if file.filename == "":
        return "Soubor nemá jméno", 400

    # if not allowed_file(file.filename):
    #     return "Nepovolený typ souboru", 400

    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_filename = f"{uuid.uuid4()}.{ext}"

    save_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)
    file.save(save_path)
    print("SAVE PATH:", save_path)

    return unique_filename, 200

@app.route("/revert", methods=["DELETE"])
def revert():
    file_id = request.get_data(as_text=True).strip()

    if not file_id:
        return "Chybí ID souboru", 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_id)

    if os.path.exists(file_path):
        os.remove(file_path)

    return "", 200

# ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf", "doc", "docx", "xlsx", "txt"}

# def allowed_file(filename):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == "__main__":
    app.run(debug=True)