import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CategoryType } from "../category-type.enum";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({message:'Nom de catégorie obligatoire'})
    name :string

    @IsEnum(CategoryType)
    @IsNotEmpty()
    type : CategoryType

}
