# Virus simulations to demonstrate the effect mask use

Live demo [here](https://ryshackleton.github.io/mask_simulation/).

This work was inspired by Harry Stevens's brilliant [Washington Post article](https://www.washingtonpost.com/graphics/2020/world/corona-simulator/) simulating transmission dynamics with and without social distancing.

This simulation is simpler than the model in the WaPo article, but tests the effects of mask use in the general population. The main difference is that there are no true "collisions" in the model (although they could be added). The simulation only detects when particles come in contact and treats each contact as a potential transmission.

The other difference between this and the WaPo simulations is that in this model, there are multiple simulations where the positions, node-node contacts, and transmission probabilities are the same between models, but the transmission dynamics differ only by the presence or absence of masks. In this way, these simulations isolate the effect of mask use for a given set of parameters.

The key assumptions are:
* The positions and random values that determine whether an infector node can infect a susceptible node are identical between the two models. Thus differences between the models arise only from susceptibility reduction due to mask use.
* Infected nodes have some time after which they recover (pink nodes) and are no longer susceptible
* There is a constant "base" probability (4%) that transmission will occur between an infected and susceptible node when they come in contact.
* The preventative effects of mask use on transmission probability are derived from [IHME's meta regression analysis of mask efficacy from the June 25th update](http://www.healthdata.org/covid/updates). For each mask wearer, we assume a transmissivity reduction of 33%, corresponding with non-medical mask use in the general population. In this model, the reduction is assumed for both the infected node (infector) and the susceptible node (infectee), although the IHME analysis only took into account reduction in transmission for the susceptible mask wearers. Several cases are provided as examples:
  * neither infected or susceptible wear masks: 4% probability of transmission
  * infected wears mask, susceptible doesn't wear mask: 4% * 0.67 = 3.35% probability of transmission
  * susceptible wears mask, infector doesn't wear mask: 4% * 0.67 = 3.35% probability of transmission
  * both infector and infectee wear mask: 4% * 0.67 * 0.67 = 2.25% probability of transmission
* Once the transmission probability is calculated for a node-node contact, we use the same random value (associated with each infected nodes in the model) to determine whether a given node is affected (if random value <= transmission probability, infection occurs)
* the system is closed: no nodes (people) die or are removed, and no new nodes are added

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
