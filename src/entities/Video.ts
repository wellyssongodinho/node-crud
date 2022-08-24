import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";
import { Category } from "./Category";

@Entity("videos")
export class Video {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    duration: number;
    
    @Column()
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({name:"category_id", referencedColumnName: "id"})
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn
    updated_at: Date;

    constructor(){
        //generate unique id if null
        if (!this.id) {
            this.id = v4();
        }
    }
}