# ClimateAware

![Team Website](https://github.com/NguyenHuy190303/NASA/blob/main/photo_2024-10-06_19-12-32.jpg)

## About the Project

Climate Aware is a platform that aims to raise awareness about climate change by simplifying complex climate data into interactive and actionable narratives. The project is built by Team WakeUp, a dedicated group driven by the mission of awakening individuals to the urgent realities of Earth's climate crisis through technology and data. We transform critical climate insights from open-source data sources like NASA and the US Greenhouse Gas Center into engaging, easy-to-understand timelines.

Our website features an AI chatbot designed to break down intricate climate topics and data into understandable concepts. Users are guided through storylines that answer key questions:
- What has happened?
- What can we do collectively?
- What actions can individuals take?

The project empowers users to make informed decisions, reduce their carbon footprint, and foster climate awareness. By utilizing visuals, videos, and interactive elements, we provide a comprehensive user experience that educates and inspires action for a sustainable future.

## Features
- **Interactive Story Timelines:** Simplifies complex climate data into engaging storylines.
- **AI Chatbot:** A chatbot that answers climate-related questions and explains the data presented.
- **Open-Source Data Utilization:** Uses NASA's and the US Greenhouse Gas Center's data to generate insights.
- **Actionable Steps:** Offers guidance on reducing energy consumption, minimizing waste, and supporting sustainable practices.

## Technology Stack
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Python, Flask
- **AI/ML:** Integration with OpenAI API for chatbot features.
- **Data Visualization:** Data analysis and interactive visuals using Python.
- **Design Tools:** Figma for UI/UX and presentation design.
- **Collaboration Tools:** GitHub for version control, Telegram, and WhatsApp for team communication.

## Getting Started

### Prerequisites
- Python 3.x
- Flask
- OpenAI API key (stored in a `.env` file)
- Node.js (for JavaScript execution)

## Installation
###For normal user
To install the application, click [here to download and run the setup script](https://github.com/NguyenHuy190303/WakeUp/raw/main/setup.bat).

1. Click the link above to download the `setup.bat` file.
2. Run the `setup.bat` file after downloading to install the application.

**Note:** If you see a security warning, select "Run anyway" to proceed with the installation.
###For dev user
1. Clone the repository:
   ```sh
   git clone https://github.com/NguyenHuy190303/WakeUp.git
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the Application
1. Start the Flask server:
   ```sh
   python app.py
   ```
2. Access the web app by navigating to `http://localhost:5000` in your browser.

### Deployment
- The project can be deployed using [Streamlit](https://streamlit.io/) or hosted publicly with services like [Ngrok](https://ngrok.com/).

## Usage
- Open the web app and explore the sample climate stories.
- Use the AI chatbot to get further insights or answers to your climate-related questions.

## Team Members
- **Leo:** Team leader, AI and Backend Specialist, responsible for developing predictive models and managing data processing systems.
- **Linh:** Data Science Expert specializing in data visualization and frontend development, creating insightful visual narratives and user-friendly interfaces.
- **James Chimdindu Ogbonna:** Creative UI/UX Designer, transforming complex ideas into intuitive user journeys.
- **Kevin Junior Ojang Ojong:** Frontend Developer, responsible for integrating backend and leading presentations.

## License
This project is licensed under the MIT License. See `LICENSE` for more information.

## Acknowledgments
- OpenAI for providing the GPT API.
- NASA and the US Greenhouse Gas Center for open-source data.
- Figma for design support.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for review.
