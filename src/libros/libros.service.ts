import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
  // Nuestro almacenamiento en memoria temporal
  private libros: Libro[] = [];

  // 3. Crear registro
  create(createLibroDto: CreateLibroDto) {
    const maxId =
      this.libros.length > 0 ? Math.max(...this.libros.map((l) => l.id)) : 0;
    const newId = maxId + 1;

    // Mapeo explícito para que TypeScript en Render no llore
    const nuevoLibro: Libro = {
      id: newId,
      titulo: createLibroDto.titulo,
      autor: createLibroDto.autor,
      editorial: createLibroDto.editorial,
      anio_publicacion: createLibroDto.anio_publicacion,
    };

    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  // 1. Listar registros
  findAll() {
    return this.libros;
  }

  // 2. Obtener un registro por id
  findOne(id: number) {
    const libro = this.libros.find((l) => l.id === id);
    if (!libro) {
      throw new NotFoundException(
        `El libro con el id ${id} no existe en el registro.`,
      );
    }
    return libro;
  }

  // 4. Actualizar registro
  update(id: number, updateLibroDto: UpdateLibroDto) {
    const index = this.libros.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `No puedo actualizar un libro que no existe (id: ${id}).`,
      );
    }

    // Actualizamos combinando el objeto existente con los nuevos datos
    this.libros[index] = { ...this.libros[index], ...updateLibroDto };
    return this.libros[index];
  }

  // 5. Eliminar registro
  remove(id: number) {
    const index = this.libros.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `No hay libro para eliminar con el id ${id}.`,
      );
    }

    // Lo sacamos del arreglo
    const libroEliminado = this.libros[index];
    this.libros.splice(index, 1);
    return libroEliminado;
  }
}
