export interface Pokemon {
  name: string;
  id: number;
  image: string;
  url?: string; // Menandai url sebagai opsional jika tidak diperlukan di beberapa bagian
}

  
  export interface PokemonResult {
    name: string;
    url: string;
  }
  
  export interface PokemonApiResponse {
    results: PokemonResult[];
  }
  
  export interface PokemonListResponse {
    results: Pokemon[];
  }