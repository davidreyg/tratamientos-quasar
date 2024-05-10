#!/bin/bash

# Ruta de los proyectos
laravel_project="/home/daregu/Escritorio/tratamientos-php"
quasar_project="/home/daregu/Escritorio/golquasar"

# Ruta de los archivos
quasar_dist="$quasar_project/dist/spa"
laravel_public="$laravel_project/public"
laravel_views="$laravel_project/app/Containers/AppSection/Root/UI/WEB/Views"


# Eliminar todas las carpetas en el directorio public excepto la carpeta 'css'
find "$laravel_public" -mindepth 1 -maxdepth 1 -type d ! -name 'css' -exec rm -r {} \;

# Utilizar rsync para copiar solo las carpetas de Quasar a la carpeta public de Laravel
cp -r "$quasar_dist"/* "$laravel_public"
# Copiar los archivos de Quasar a la carpeta public de Laravel
#cp -r "$quasar_dist" "$laravel_public"
# Renombrar index.html a index.app.blade.php
mv "$laravel_public/index.html" "$laravel_views/welcome-page.blade.php"

echo "Carpetas copiadas exitosamente."
