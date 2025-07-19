
### Fake data simulation

As the repo name suggests, this project simulates data that we *should* receive from the sensors, capteurs and any other source.
  

It sends data to specific endpoints of  our main backend and this data is sent every few minutes . The idea is to mimic real sensor behavior in two ways:


####  Image Simulation

We simulate two types of image inputs: 

1.  **Weight Detection Images**

From a folder of fake images (`src/dummy_image_data/weight_images`), we randomly select and send one image to our backend model. This simulates a camera capturing weight-related visuals.


2.  **Disease Detection Images**

Similar process, but using images from `src/dummy_image_data/disease_images` to simulate visuals of diseased fish

  
in reality but for purpose of demonstration we decided to split them   

#### Monitoring Data Simulation 
We also simulate regular sensor data for things like:

* pH level

* Water level

* Temperature

* And other monitoring parameters 
  
These values are **randomly generated** but stay within a logical and realistic range for each parameter.