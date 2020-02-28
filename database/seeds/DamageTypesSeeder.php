<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DamageTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('damage_types')->insert([
            [
                'name' => 'Cracking',
                'description' => 'Damage occurs in the surface layer of the road, divided into 9 (nine) types of cracks are: hair cracking, alligator cracks, edge cracks, edge joint cracks, lane joint cracks, widening cracks, reflection cracks, shrinkage cracks, slippage cracks to cause varying among others could be because the soil road base is less stable, the surrounding drainage system is not good, the job execution procedure that is not good, not good paving material, which exceeds the load capacity of the road traffic and other causes'
            ],
            [
                'name' => 'Distortion',
                'description' => 'Deformation caused by the carrying capacity of the foundation soil is not good and compaction layer or foundation that is not good, resulting in additional compaction by traffic load. Types and causes of distortion must be known to determine the appropriate type of repair.'
            ],
            [
                'name' => 'Disintegration',
                'description' => 'This damage is a defect on the surface of the pavement in the form of damage to roads perkersan layer mechanically and chemically. Forms of damage can be Potholes, raveling, stripping. The causes can vary because the drainage system is not good, weather influences, material that does not comply with the specification.'
            ],
            [
                'name' => 'Polished aggregate',
                'description' => 'The existence of polished aggregate causing slippery roads and dangerous for vehicle and driver through the lane. The cause of this damage is not a wear-resistant aggregate material to the wheels of vehicles, aggregates that are round or cubical shaped not slick. How to fix that with the closure of defective parts with the appropriate layer.'
            ],
            [
                'name' => 'Bleeding or flushing',
                'description' => 'The road surface becomes slippery and dangerous for the vehicle across the road. Under conditions of high temperature asphalt, the asphalt becomes soft and causes traces kemdaraan passing wheels on the road surface. Bleeding caused by the use of high content of asphalt in the asphalt mix, asphalt excessive use on the job tack coat and prime coat. This type can be improved by sowing aggregate heat and compaction, or removal of the asphalt layer and providing a cover layer'
            ],
            [
                'name' => 'Utility cut depression',
                'description' => 'In the former planting done compaction utilities that do not qualify so a decline throughout the section. This type can be fixed with the demolition of the section and replace it with an appropriate compaction and road construction superimposed with a suitable pavement.'
            ],
        ]);
    }
}
