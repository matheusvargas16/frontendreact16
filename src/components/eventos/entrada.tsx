import React from 'react';

// propriedades da entrada
interface EntradaProps {
  tipo?: 'text' | 'number' | 'date'; // tipo do input
  texto: string; 
  valor: any; 
  somenteLeitura?: boolean; 
  onChange?: (valor: any) => void; 
}

// componente de entrada 
const Entrada: React.FC<EntradaProps> = (props) => {
  return (
    <div className="flex flex-col mt-3">
      <label className="mb-2 text-gray-700 font-semibold">
        {props.texto}
      </label>
      {/* baseados nas propriedades recebidas */}
      <input
        type={props.tipo ?? 'text'}
        value={props.valor}
        readOnly={props.somenteLeitura}
        onChange={(e) => props.onChange?.(e.target.value)}
        className={`
          border border-amber-500 rounded-lg
          focus:outline-none bg-orange-100 px-4 py-2 
          ${props.somenteLeitura ? '' : 'focus:bg-white'}
        `}
      />
    </div>
  );
};

export default Entrada;
