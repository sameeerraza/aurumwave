# Getting Started

Follow these steps to set up the environment, clone the project, and run it.

## Prerequisites

### For Linux/macOS:

No special prerequisites are required, as the script will automatically install Node.js and npm if they are not already installed.

### For Windows:

Make sure Node.js is installed. If it is not installed, download and install it from [https://nodejs.org](https://nodejs.org).

After installation, verify Node.js and npm by running the following commands in your command prompt:

```sh
node -v
npm -v
```

These should output the installed version numbers.

## Clone the Repository

Next, clone the repository from GitHub:

```bash
git clone https://github.com/myousafmalik/AurumWave.git
```

## Navigate to the Project Directory

Move into the project directory:

```bash
cd AurumWave
```

## Run the Project

### On Linux/macOS:

1. Run the following script to automatically check and install Node.js if needed, then install dependencies and start the project:

    ```bash
    ./run.sh
    ```

    > **Note**: If you encounter a permission error, make the script executable:
    >
    > ```bash
    > chmod +x run.sh
    > ```

### On Windows:

1. Make sure Node.js is installed as mentioned above.
2. Run the following batch script to install dependencies and start the project:

    ```bat
    run.bat
    ```

If Node.js is not installed, the script will only notify you and provide the link to download and install it.