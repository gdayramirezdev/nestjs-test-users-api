import { Exclude } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export enum Role {
  ADMIN = 'admin',
  FILMS = 'films',
  PEOPLE = 'people',
  LOCATIONS = 'locations',
  SPECIES = 'species',
  VEHICLES = 'vehicles',
};

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string
  @Column({ unique: true })
  email: string
  @Column()
  @Exclude()
  password: string
  @Column({
    type: 'enum',
    enum: Role,
  })
  role: string
};