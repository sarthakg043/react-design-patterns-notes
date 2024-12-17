# Summary of Controlled and Uncontrolled Components

## Table of Contents
1. [Uncontrolled Form](#1-uncontrolled-forms)
2. [Controlled Form](#2-controlled-forms)
3. [Uncontrolled Modal](#3-uncontrolled-modals)
4. [Controlled Modal](#4-controlled-modals)

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