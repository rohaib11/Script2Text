
# Script2Text

**Script2Text** is an Optical Character Recognition (OCR) application designed to recognize handwritten text from scanned or photographed images and convert it into digital text. The application uses Tesseract OCR for text recognition and allows users to upload images, process text, and export it in various formats.

## Features

- **OCR (Optical Character Recognition)**: Recognizes handwritten text from images.
- **Multi-language Support**: Allows OCR in multiple languages.
- **Real-Time Collaboration**: Users can collaborate in real-time to edit recognized text.
- **Text Export**: Export the recognized text to various formats like TXT, Markdown, or PDF.
- **History**: View a history of previously processed OCR documents.
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
## Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
   - [Frontend (React)](#frontend-react)
   - [Backend (Flask)](#backend-flask)
5. [Steps to Set the Path for Tesseract](#steps-to-set-the-path-for-tesseract)
6. [Steps to Download and Install Language Files for Tesseract](#steps-to-download-and-install-language-files-for-tesseract)
7. [Usage](#usage)
   - [Frontend](#frontend)
   - [Backend](#backend)
8. [Contributing](#contributing)
9. [License](#license)
10. [Acknowledgements](#acknowledgements)


## Demo

You can check out the live demo [here](#). (Replace with your actual demo URL if you have one.)

## Tech Stack

- **Frontend**:
  - React
  - Tailwind CSS
  - Axios (for API requests)
  - Socket.IO (for real-time collaboration)

- **Backend**:
  - Flask
  - OpenCV (for image processing)
  - pytesseract (for OCR)
  - Flask-SocketIO (for real-time updates and collaboration)

- **Database**: Local storage for document history (can be replaced with a proper database for production).

## Installation

### **Frontend (React)**

1. Clone the repository:

   ```bash
   git clone https://github.com/rohaib11/Script2Text.git
   cd Script2Text/ocr-frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   This will start the frontend on `http://localhost:3000`.

### **Backend (Flask)**

1. Navigate to the backend folder:

   ```bash
   cd Script2Text/backend
   ```

2. Create a Python virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:

     ```bash
     .\venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

4. Install the required Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask backend:

## Go To Before Running backend 
5. [Steps to Set the Path for Tesseract](#steps-to-set-the-path-for-tesseract)
6. [Steps to Download and Install Language Files for Tesseract](#steps-to-download-and-install-language-files-for-tesseract)
   ```bash
   python app.py
   ```

   The backend will be running on `http://localhost:5000`.

---

## Steps to Set the Path for Tesseract

To use **Tesseract OCR** in this project, you need to install **Tesseract OCR** and set its path correctly. Here's how you can do that:

1. **Download and Install Tesseract OCR**:
   - Go to the [Tesseract OCR releases page](https://github.com/tesseract-ocr/tesseract/releases/download/5.5.0/tesseract-ocr-w64-setup-5.5.0.20241111.exe) and download the installer for your system.
   - Install Tesseract by following the installation instructions.
   - During installation, **note the installation directory**. The default directory is usually:
     ```
     C:\Program Files\Tesseract-OCR
        ```

2. **Set the Tesseract Path**:
   - After installation, you need to tell the backend (Flask app) where Tesseract is installed. In the backend code (`app.py`), set the path to the Tesseract executable:

     ```python
     pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
     ```

   - Update the path to match the actual installation location on your machine if it's different from the default.

---

## Steps to Download and Install Language Files for Tesseract

Tesseract supports multiple languages. To use languages other than English, you need to download and install the appropriate language files.

1. **Download Language Files**:
   - Go to this [Google Drive folder](https://drive.google.com/drive/folders/1krqUJFGMAdE5KoqNSQpMZCjF9HGXPJXS?usp=sharing) to download the required Tesseract language files.

2. **Copy the Language Files**:
   - After downloading the language files, copy them to the `tessdata` folder of your Tesseract installation. By default, the `tessdata` folder is located in:
     ```
     C:\Program Files\Tesseract-OCR	essdata
     ```

   - **Note**: If the `tessdata` folder doesn’t exist, you can create it manually within the `Tesseract-OCR` directory.

3. **Supported Languages**:
   Below is the list of supported languages that you can use with Tesseract OCR:

   ```json
   [
     { "code": "eng", "name": "English" },
     { "code": "spa", "name": "Spanish" },
     { "code": "fra", "name": "French" },
     { "code": "deu", "name": "German" },
     { "code": "ita", "name": "Italian" },
     { "code": "por", "name": "Portuguese" },
     { "code": "rus", "name": "Russian" },
     { "code": "ara", "name": "Arabic" },
     { "code": "hin", "name": "Hindi" },
     { "code": "chi_sim", "name": "Chinese (Simplified)" },
     { "code": "jpn", "name": "Japanese" },
     { "code": "kor", "name": "Korean" },
     { "code": "nld", "name": "Dutch" },
     { "code": "tur", "name": "Turkish" },
     { "code": "vie", "name": "Vietnamese" },
     { "code": "tha", "name": "Thai" },
     { "code": "urd", "name": "Urdu" },
     { "code": "ben", "name": "Bengali" },
     { "code": "tam", "name": "Tamil" },
     { "code": "guj", "name": "Gujarati" },
     { "code": "pan", "name": "Punjabi" },
     { "code": "kan", "name": "Kannada" },
     { "code": "mal", "name": "Malayalam" },
     { "code": "mar", "name": "Marathi" },
     { "code": "tel", "name": "Telugu" },
     { "code": "osd", "name": "Orientation Detection" }
   ]
   ```

---

## Usage

### **Frontend**

1. **Select Language**:
   - Choose the language in which the text is written to improve OCR accuracy.

2. **Upload Image**:
   - Use the "Drag & Drop" area to upload an image containing handwritten text.

3. **Text Recognition**:
   - Once the image is uploaded, the text will be automatically recognized and displayed.

4. **Edit Text**:
   - After text recognition, you can edit the text in the `ResultEditor` component.
   - **Real-time collaboration**: Multiple users can edit the text at the same time if they join the same room.

5. **Export Text**:
   - Export the recognized text in various formats (TXT, Markdown, or PDF).

### **Backend**

1. **Image Processing**:
   - The backend uses **OpenCV** to preprocess the image (convert to grayscale, apply thresholding) for better recognition by **Tesseract OCR**.

2. **OCR Recognition**:
   - **Tesseract OCR** is used to extract text from the preprocessed image.

3. **Saving and Loading Documents**:
   - Recognized text can be saved in memory (or to a database for production) and can be retrieved using the document ID.

4. **SocketIO for Collaboration**:
   - Users can join collaboration rooms and edit text in real-time. Changes are broadcasted to all users in the same room using **Socket.IO**.

## Contributing

Contributions are welcome! If you'd like to contribute to **Script2Text**, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- **Tesseract OCR**: Open-source OCR engine.
- **OpenCV**: Computer vision library used for image preprocessing.
- **Socket.IO**: Enables real-time communication for collaborative editing.
- **Flask**: Python web framework used for the backend.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.

