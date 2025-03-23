# Casting Controller
---

This project is the submoudle of `Digital Casting System` for PLC controller and ABB robot.

---

## Requirements

- [TwinCAT 3](https://www.beckhoff.com/en-en/products/automation/twincat/?pk_campaign=AdWords-AdWordsSearch-TwinCAT_EN&pk_kwd=twincat&gclid=Cj0KCQjw9ZGYBhCEARIsAEUXITW5dmPmQ2629HIuFY7wfbSR70pi5uY2lkYziNmfKYczm1_YsK4hhPsaApjyEALw_wcB)
- [ABB RobotStudio 2023/2024](https://new.abb.com/products/robotics/robotstudio)
- [Docker](https://www.docker.com/)

## Package Information

* `machines`: the dosing pump driver data.
* `plc`: the TwinCAT project for the PLC controller.
* `robot`: the ABB robot 4600 package for RobotStudio.
* `script`: the example script for controlling a physical and virtual robot via ROS wrapper package.

> Software Pipeline
![software_pipeline](/project/casting_controller/software_pipeline.png)


## Usage
### DCS robot control panel

> Class Diagram, take main page as an example
![panel_class_diagram](/project/casting_controller/panel_class_diagram.png)

Please find more detail on [online doc]().

### Connect with TwinCAT
Install TwinCAT 3.4 and open the project in `plc\A061_DCS_ConcreteController_v1` folder.
Detailed setup instructions can be found [here](./plc/readme_plc.md).

### Connect with ABB robot 4600
The source code is `/robot//robot/robotstudio`.

Real controller (Physical Robot) via Docker

```bash
docker
# clean the stopped container
docker container prune

# compose up and connect with docker container
docker-compose -f /
.\robot\docker_compas_rrc\real_controller\docker-compose.yml up

# run the wellcome script
python .\script\welcome_dcs.py

```

Virtual Controller(RobotStudio Simulation)

```bash
docker
# clean the stopped container
docker container prune

# compose up and connect with docker container
docker-compose -f /
.\robot\docker_compas_rrc\virtual_controller\docker-compose.yml up

# run the wellcome script
python .\script\welcome_dcs.py

```

## Credits
Author: [Wei-Ting Chen] 

This package was created by [Wei-Ting Chen] at [USI-FMAA](https://github.com/USI-FMAA) and [ETHZurich DFab](https://dfab.ch/).

## Acknowledgment
compas_rrc is a wrapper for the ROS-Industrial Abb driver. The original package can be found
[here](https://github.com/compas-rrc)

[Wei-Ting Chen]: https://github.com/WeiTing1991
[Digital Casting System]: https://github.com/USI-FMAA/digital_casting_system.git

