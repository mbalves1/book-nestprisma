import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const bookExist = await this.prisma.book.findFirst({
      where: {
        bar_code: createBookDto.bar_code,
      },
    });

    if (bookExist) {
      throw new Error('Book already exists');
    }

    const book = await this.prisma.book.create({
      data: createBookDto,
    });
    return book;
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
    return book;
  }

  async remove(id: string): Promise<BookEntity> {
    return this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
