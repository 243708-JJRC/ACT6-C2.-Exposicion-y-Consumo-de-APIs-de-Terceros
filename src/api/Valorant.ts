export interface Agent {
  uuid: string;
  displayName: string;
  description: string;   
  fullPortrait: string;
  background: string; 
  role: {
    displayName: string;
    displayIcon: string;
  } | null;
  abilities: Ability[];
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string | null;
}

export interface Weapon { 
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  weaponStats: {
    fireRate: number; 
    magazineSize: number;
    reloadTimeSeconds: number;
    damageRanges: {
      rangeStartMeters: number;
      rangeEndMeters: number;
      headDamage: number;
      bodyDamage: number;
      legDamage: number;
    }[]; 
  } | null;
  shopData: {
    cost: number;
  } | null;
  skins: Skin[];
}

export interface MapData {
  uuid: string;
  displayName: string;
  tacticalDescription: string | null;
  coordinates: string | null;
  displayIcon: string | null;
  splash: string;
}

export interface Skin {
  uuid: string;
  displayName: string;
  themeUuid: string;
  contentTierUuid: string | null;
  displayIcon: string | null;
  chromas: {
    uuid: string;
    displayName: string;
    displayIcon: string | null;
    fullRender: string;
    swatch: string | null;
  }[];
}


export const getAgents = async (): Promise<Agent[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;
    
    const response = await fetch(`${baseUrl}/agents?isPlayableCharacter=true&language=es-MX`);
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    const data = await response.json();
    return data.data; 
    
  } catch (error) {
    console.error("Error al obtener los agentes:", error);
    throw error; 
  }
};

export const getAgentById = async (id: string): Promise<Agent> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;
    const response = await fetch(`${baseUrl}/agents/${id}?language=es-MX`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error("Error en getAgentById:", error);
    throw error; 
  }
};

export const getWeapons = async (): Promise<Weapon[]> => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;

        const response = await fetch(`${baseUrl}/weapons?language=es-MX`);

        if (!response.ok){
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener las armas: ",error);
        throw error;
    }
};

export const getWeaponById = async (uuid: string): Promise<Weapon> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;
    const response = await fetch(`${baseUrl}/weapons/${uuid}?language=es-MX`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data; 
    
  } catch (error) {
    console.error("Error en getWeaponById:", error);
    throw error; 
  }
};

export const getSkins = async (): Promise<Skin[]> => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;

        const response = await fetch(`${baseUrl}/weapons/skins?language=es-MX`);

        if (!response.ok){
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener las skins de las armas: ",error);
        throw error;
    }
};

export const getMaps = async (): Promise<MapData[]> => {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;

        const response = await fetch(`${baseUrl}/maps?language=es-MX`);

        if (!response.ok){
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error al obtener los mapas: ",error);
        throw error;
    }
};

export const getMapById = async (id: string): Promise<MapData> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VALORANT_API_URL;
    const response = await fetch(`${baseUrl}/maps/${id}?language=es-MX`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data; 
    
  } catch (error) {
    console.error("Error en getMapById:", error);
    throw error; 
  }
};