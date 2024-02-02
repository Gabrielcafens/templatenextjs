import type React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface PokemonSearchForm {
  pokemonName: string;
}

export const Navbar: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<PokemonSearchForm>();

  const onSubmit: SubmitHandler<PokemonSearchForm> = (data) => {
    // Lógica para lidar com a submissão do formulário
    //console.log('Pokemon name:', data.pokemonName);
    // Aqui você pode realizar a lógica para buscar o Pokémon com o nome fornecido
  };

  return (
    <nav>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('pokemonName', { required: 'Pokemon name is required' })}
          type="text"
          placeholder="Enter Pokemon Name"
          onChange={(e) => setValue('pokemonName', e.target.value)}
        />
        <button type="submit">Search Pokemon</button>
      </form>
    </nav>
  );
};
