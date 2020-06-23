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
                'name' => 'Enter the first letter of your state',
                'description' => 'Bad Federal Road Location'
            ],
            [
                'name' => 'Enter Bad Road Local Government ',
                'description' => 'Local Government'
            ],
            [
                'name' => 'Enter Bad Road State',
                'description' => 'Bad Road (State).'
            ],
            [
                'name' => 'Enter your full name for FERMA Marshal National Award Consideration',
                'description' => 'FERMA Marshal National Award Consideration'
            ],
            // [
            //     'name' => 'Bleeding or flushing',
            //     'description' => 'The road surface becomes slippery and dangerous for the vehicle across the road. Under conditions of high temperature asphalt, the asphalt becomes soft and causes traces kemdaraan passing wheels on the road surface. Bleeding caused by the use of high content of asphalt in the asphalt mix, asphalt excessive use on the job tack coat and prime coat. This type can be improved by sowing aggregate heat and compaction, or removal of the asphalt layer and providing a cover layer'
            // ],
            // [
            //     'name' => 'Utility cut depression',
            //     'description' => 'In the former planting done compaction utilities that do not qualify so a decline throughout the section. This type can be fixed with the demolition of the section and replace it with an appropriate compaction and road construction superimposed with a suitable pavement.'
            // ],
        ]);
    }
}
