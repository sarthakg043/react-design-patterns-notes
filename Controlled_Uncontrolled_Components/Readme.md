# Summary of Controlled and Uncontrolled Components

## Table of Contents
1. [Uncontrolled Form](#1-uncontrolled-forms)
2. [Controlled Form](#2-controlled-forms)
3. [Uncontrolled Modal](#3-uncontrolled-modals)
4. [Controlled Modal](#4-controlled-modals)
5. [Uncontrolled Onboarding Flow](#5-uncontrolled-onboarding-flow)
6. [Controlled Onboarding Flow](#6-controlled-onboarding-flow)


## 1: Uncontrolled Forms
Forms which don't care what values are in input unless an event like `submit` is triggered.

[Code Example](forms/README.md#uncontrolled-form)

## 2: Controlled Forms
They Track values of each input by `useState` hook and leverage `onChange` attribute to track changes to input field which is helpful in providing user feedback according to the data entered by him/her.

[Code Example](forms/README.md#controlled-form)

## 3: Uncontrolled Modals
Modals which themselves control whether or not it is opened or closed meaning there is no prop of a utility which allows parent to control the Modal behaviour like opening and closing.

[Code Example](modals/README.md#uncontrolled-modal)

## 4: Controlled Modals
Modals which have the functionality to allow parent to control its behaviour like opening or closing by leveraging props. e.g. `isOpen`, `onRequestClose`.

[Code Example](modals/README.md#controlled-modal)

## 5: Uncontrolled Onboarding Flow
An uncontrolled onboarding flow in React involves managing the state internally within the component, allowing each step to progress by updating the state. This can be achieved by passing a `goToNext` function as a prop to each step component, which updates the current step index and collects data from each step. The collected data is stored in a state variable and can be passed to a final function `onFinish` once the onboarding process is complete. This approach simplifies the flow by handling state transitions and data collection internally, without requiring external state management.
As the states for `onboardingData` and `currentIndex` are maintained inside the component.

[Code Example](onboardingFlow/README.md#uncontrolled-onboarding-flow)

> This Onboarding flow is uncontrolled because the parent has very little control over it. Let's say we want to hind and show certain steps based on the data being provided by the user.

## 6: Controlled Onboarding Flow
Instead of having `onboardingData` and `currentIndex` as states, we can have them as props to be passed by the parent.

- This makes `ControlledOnboardingFlow` controlled by parent and itself being unaware of the data being passed.
- It also allows to dynamically show `Steps` as the parent has access to data.
- It gives much more flexibility on how or Onboarding Flow looks like.

[Code Example](onboardingFlow/README.md#controlled-onboarding-flow)