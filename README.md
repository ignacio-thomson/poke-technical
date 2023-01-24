- Bienvenidos a mi aplicación, Pokedéx, diseñada con el Framework Angular y los recursos de Angular Material (mat-table, mat-complete, etc).

- Diseñé la aplicación de dos formas, una completamente apegada a los requerimientos técnicos (poke-api) y otra con una
  modificación meramente basada en gusto personal (poke-technical).

- Esta aplicación fue desarrollada únicamente cuando la prueba técnica original se encontraba completada y desplegada, pero la idea de realizarla existió desde un principio. La única razón por la que decidí efectuar este pequeño cambio, fue para añadir un poco más de variedad visual, para tener más imagenes, color y contenido en el sitio. Espero no haber sido inoportuno con mi iniciativa 😥.

- Las aplicaciones fueron contenerizadas, junto con todas las dependencias necesarias para que estas funcionen en cualquier equipo/ambiente sin problemas.

- Las aplicaciones fueron desplegadas en la nube, con el servicio EC2 (Amazon Elastic Compute Cloud) de AWS, en una instancia de Ubuntu donde se descargó la imagen Docker creada por mi, desde Docker-hub, y está completamente funcional.

- Las aplicaciones también fueron desplegadas en Vercel. https://poke-technical-deploy.vercel.app/ - https://poke-api-v2-mu.vercel.app/

- Esta versión de la aplicación contiene una barra de búsqueda (con sugerencias y autocompletado) dedicada únicamente a una Card, donde se despliega la información. Esta Card también tiene un Link que redirije a la Wiki, donde se ve la información del Pokémon seleccionado.

- Más abajo está la tabla, con la información de los +1000 pokémones. La funcionalidad de la tabla se extiende a un Sort, Pagination y la acción 'Details', que envía la información del pokémon elegido a la Card ubicada junto a la Table.

- Abajo de esta tabla, se encuentra la Tabla alfabética, donde se realiza el contéo de las iniciales de los pokémones.

- Extra: los extras son los links que redirijen a mi portafolio, mis repositorios de Github y mi perfil de Linkedin.
