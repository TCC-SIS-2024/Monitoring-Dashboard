import {createSystem, defaultConfig} from "@chakra-ui/react";

export const themeSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        white: { value: "#fff" },
        whiteDifferent: { value: '#f7f7f8' },
        mintCream: {
          100: { value: '#EFFEF7' },
          200: { value: '#EFFEF7' },
        },
        greenPigment: {
          100: { value: '#0FA968' },
          200: { value: '#0FA968' },
        },
        blackPearl: {
          100: { value: '#06150E' },
          200: { value: '#06150E' },
        },
        darkGreen: {
          100: { value: '#03301F' },
          200: { value: '#08271A' },
        },
        charlestonGreen: {
          100: { value: '#091E15' },
        },
        darkJungleGreen: {
          100: { value: '#11261B' },
        },
        mediumSeaGreen: {
          100: { value: '#126945' },
          200: { value: '#1A8151' },
          300: { value: '#2E7956' },
        },
        brunswickGreen: {
          100: { value: '#143B28' },
          200: { value: '#214835' },
        },
        darkSpringGreen: {
          100: { value: '#155236' },
          200: { value: '#1B5B3A' },
        },
        calPolyPomonaGreen: {
          100: { value: '#173825' },
        },
        emerald: {
          100: { value: '#39AD7A' },
        },
        outerSpace: {
          100: { value: '#3C4D45' },
        },
        mediumAquamarine: {
          100: { value: '#43E5A0' },
        },
        dimGray: {
          100: { value: '#4A4E4C' },
        },
        xanadu: {
          100: { value: '#638374' },
        },
        grayWeb: {
          100: { value: '#7D8581' },
        },
        lightSeaGreen: {
          100: { value: '#8CBDA7' },
        },
        ashGray: {
          100: { value: '#B4BFBA' },
        },
        aeroBlue: {
          100: { value: '#B8FADD' },
        },
        softgray: {
          50: { value: '#e6e6e6' },
          100: { value: '#757575' },
        },
      },
    },
  },
});
