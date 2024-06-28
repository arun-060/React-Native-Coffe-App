import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const userStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            FavouratiesList: [],
            CartList: [],
            OrderHistoryList: []
        }),
        {
            name: 'coffee_app',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)