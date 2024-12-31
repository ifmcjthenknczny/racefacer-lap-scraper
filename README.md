# Racefacer Lap Scraper

## Overview

This project is a Deno application designed to scrape lap time data from the Racefacer website. It automates the process of extracting session lap times for all available tracks with logging in. The data is then saved as JSON files for further use.

## What you need to know - put briefly
- Clone repo, install deno if you don't have it, install packages.
- Copy `.env_sample` file and rename it to `.env`. Put remaining envs - your credentials for logging in.
- Run the code.

## Installation

### Prerequisites

- Deno 2.1.4
- npm (v6 or higher)
- Deno

### Setup

#### Clone the Repository:

```bash
git clone https://github.com/ifmcjthenknczny/racefacer-lap-scraper
cd racefacer-lap-scraper
```

#### Install Dependencies:

Run the following command to install all necessary dependencies:

```bash
deno install --frozen=true
```

## Usage

### Configuration

Ensure that the `.env` file's envirormental variables for login `EMAIL` and `PASSWORD` are correctly set up.

### Running the Script

To run the script and scrape the lap times, execute the following command:

```bash
npm start
```

This command will transpile TypeScript files and run them.

### Output

The script will create an `out` directory in the project root if it doesn't already exist. All generated JSON files containing the scrape results will be saved in this directory.

## Features

- Automated login to Racefacer using Puppeteer.
- Bypasses cookie consent dialogs.
- Scrapes lap time data for multiple tracks in chronological order. Time is expressed in seconds.
- Saves data in JSON format for easy analysis.
- Provides config file in case selectors change in the future.
- Compatibile with ![Microsoft Windows](https://s13.gifyu.com/images/SXSOe.gif).

## Contributing

Feel free to submit issues or pull requests if you find any bugs or want to add new features. Please ensure that your code follows the project's style guidelines.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please reach out via GitHub.
[ifmcjthenknczny](https://github.com/ifmcjthenknczny)
