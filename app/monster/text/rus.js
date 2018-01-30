const text = {
  races: {
    daemon: 'демон',
    beast: 'зверь',
    lizard: 'ящерица',
    bird: 'птица',
    insect: 'насекомое',
    item: 'предмет', // волшебные вещи
  },



  //////////////////////////////////////////////////////
  // mobiles
  //////////////////////////////////////////////////////
  mobiles: {

    rathni: {
      name: 'ратни',
      race: 'daemon',
      description: 'ратни -- девочка-демон. ее родители переселились из {скудной долины|info|scarce_valley} в {кандар|info|candar} когда она еще не родилась, так что она никогда не видела своей родины в {стране демонов|info|daemon_land}. ее {отец|mobiles|rathni_father} умер еще до ее рождения, {мать|mobiles|rathni_mother} вынуждена была зарабатывать на жизнь самой черной и опасной работой -- ловлей слепых сколопендр во тьме. в надежде на лучшее будущее для дочери она продала ратни {магу|mobiles|mage} в качесте слуги, моющего котлы и замешивающего алхимическое масло.',
    },

    mage: {
      name: 'маг',
      race: 'beast',
      description: 'хозяин ратни, великий маг, очень страшный, очень суровый. ратни никогда не слышала от него ни единого доброго слова, только указания. с другой стороны ничего плохого он ей никогда не делал. ратни всем довольна, ведь в конце концов он дал ей крышу над головой, скудную пищу и мечту когда-нибудь, если повезет, перейти из роли посудомойки в роль его ученика...',
    },

    tricky_bell: {
      name: 'хитрый звонок',
      race: 'item',
      description: 'хитроумное магическое устройство которое создано что бы отвечать нежелательным посетителям (то есть всем) что их тут никто не ждет',
    },
  },
  

  //////////////////////////////////////////////////////
  // scenes
  //////////////////////////////////////////////////////
  scenes: {
    mage_room: {
      name: "комната мага",
      description: [
        "рабочий кабинет {мага|mobiles|mage}. за огромным {столом|furniture|table} сидит сам хозяин -- огромный, лохматый и очень суровый.",
        "ратни редко видела что бы он вставал из-за стола, и еще реже что бы он покидал свою комнату.",
        "весь стол завален неизвестными алхимическими ингредиентами, эликсирами, порошками, разным оборудованием и всем тем что сопутствует профессии алхимика. о назначении большинства этих вещей ратни даже не догадывается. далее стоит {огромный шкаф|furniture|shelf}. что в нем лежит ратни никогда не видела. еще дальше {кровать|furniture|bed} в каменной выемке.",
        "из комнаты ведет винтовая лестница -- как {наверх|scenes|mage_home_vallo_room} так и {вниз|scenes|mage_home_hall}",
      ],
    },

    mage_home_hall: {
      name: "дом мага. холл",
      description: [
        'прихожая в доме мага. в центре ее тяжелая {входная дверь|scenes|mage_home_outdoor}, над ней магический {хитрый звонок|mobiles|tricky_bell} который кажется умеет разговаривать. слева от входа маленькая {дверь в подвал|scenes|mage_home_cellar}. возле стены стоит старый пыльный {шкаф|furniture|shelf}. дальше расположена лестница наверх, в {комнату мага|scenes|mage_room}.',
        ],
    },    

    mage_home_cellar: {
      name: 'дом мага. подвал',
      description: [
        'подвал в доме мага. здесь очень темно, весь он освещается тусклым светом {синих водорослей|furniture|mage_home_cellar_blue_seaweeds} которые растут сами собой на каком-то подозрительном хламе. кажется из него так же торчат {грибы|furniture|mage_home_cellar_mushrooms} или что-то похожее',
        'здесь есть {колодец|furniture|mage_home_cellar_well} и оборудована {кухня|furniture|mage_home_cellar_kitchen}. вся она завалена {бутылками|info|bottle} из-под {масла колючки|info|thorny_oil} здесь ратни жила все последние годы, здесь стоит ее {тесная кроватка|furniture|mage_home_cellar_bed} и {сундук|furniture|mage_home_cellar_chest} с ее немногочисленными пожитками',
        'единственный выход отсюда -- наверх по лестнице в {холл|scenes|mage_home_hall}',
      ],
    },

    mage_home_vallo_room: {
      name: 'дом мага. комната валло',
      description: [
        'комната валло вся завалена {книжками|furniture|mage_home_vallo_room_books}, они лежат прямо на полу. вместо кровати в углу навалена огромная {куча тряпья|furniture|mage_home_vallo_room_nest}, видимо что-то вроде птичьего гнезда (валло ведь птица)',
        'винтовая лестница ведет наверх, на {чердак|scenes|mage_home_loft} и вниз, в {комнату мага|scenes|mage_room}',
      ],
    },

    mage_home_loft: {
      name: 'дом мага. комната с порталом',
      description: [
        'комната выглядит заброшенной. здесь темно и сыро. вся комната освещается одним лишь кристаллом вставленным в раму {портала|furniture|mage_home_loft_portal}, расположенного на полу посередине комнаты. вдоль стен в ряд стоят {большой шкаф с книгами|furniture|mage_home_loft_book_shelf}, далее {стеллаж с разными бутылками|furniture|mage_home_loft_bottles_rack} и рядом {большая плетеная карзина|furniture|mage_home_loft_big_basket}, кроме того в дальнем совсем темном углу навалена {куча разного хлама|furniture|mage_home_loft_trash_pile}',
        'винтовая лестница ведет вниз, в {комнату валло|scenes|mage_home_vallo_room}',
      ],
    },
  },

  dialogs: {
    tricky_bell_init: 'кто здесь? отвечай, кто ты такой? и что тебе здесь надо!?',
    tricky_bell_1: 'опять ты? что теперь?',
    tricky_bell_2: 'я запомнил что ты сказал. теперь проваливай!',
    on_tricky_bell_init_1: 'привет, звонок! это же я, ратни, не узнал?',
    on_tricky_bell_init_2: 'эээ... ты всегда такой грубый?',
    on_tricky_bell_init_3: 'что значт что мне здесь надо? я здесь живу вообще-то!',
    on_tricky_bell_1_1: 'и тебе привет...',
    on_tricky_bell_1_2: 'ничего...',
    on_tricky_bell_1_3: 'как же ты достал уже!',
    on_tricky_bell_2: 'и тебе всего хорошего',
  },


  //////////////////////////////////////////////////////
  // furniture
  //////////////////////////////////////////////////////
  furniture: {
    mage_room_table: {
      name: "стол",
      description: "огромный деревянный стол весь сплошь заставленный разными зельями и инструментами",
    },
    mage_room_shelf: {
      name: "шкаф",
      description: "массивный, высокий шкаф, на полках видны разные бутылочки с разноцветными зельями",
    },
    mage_room_bed: {
      name: "кровать",
      description: "кровать очень большая и высокая. неудивительно, ведь {ее хозяин|mobiles|mage} и сам очень велик",
    },
    mage_home_hall_door: {
      name: "входная дверь",
      description: "TEMP крепкая массивная дверь в дом {мага|mobiles|mage}. такая выдержит любой натиск",
    },
    mage_home_hall_cellar_door: {
      name: "дверь в подвал",
      description: "дверь ведущая вниз, в подвал, где живет ратни",
    },
    mage_home_hall_shelf: {
      name: "шкаф",
      description: "TEMP шкаф шкаф",
    },
  },


  //////////////////////////////////////////////////////
  // items
  //////////////////////////////////////////////////////
  items: {
    bottle: "пустая бутылка",
    blank_scroll: "чистый свиток заклинания",
    humble_dress: "скромное платье",
    dried_fish: "сушеная рыба",
    fearful_beasts_book: 'книга "ужасные твари темных глубин"',
  },


  //////////////////////////////////////////////////////
  // scene events
  //////////////////////////////////////////////////////
  events: {
    mage_room_initial: {
      flag: 'mage_room_initial',
      text: [
        'ратни стоит посреди большой комнаты. {маг|mobiles|mage} живет здесь. он сидит в большом деревянном кресле и смотрит на нее жутким взглядом',
        '-- эй, ты! иди сюда! -- зовет он',
        'ратни вся дрожит, предчувствуя что мастер позвал ее что бы сообщить что-то ужасное.',
      ],
    },
  },


  //////////////////////////////////////////////////////
  // menues
  //////////////////////////////////////////////////////
  menues: {
    main_menu: {
      controls: {
        go_to: "идти в ...", 
        speak_to: "говорить с ...",
        inspect: "осмотреть ...", // ???
        interact: "взаимодействовать с ...",
        use_on_something: "применить ... к чему-то ...",
        use_on_somebody: "применить ... к кому-то ...",
        pick_up: "подобрать предмет ...",
        drop: "бросить предмет ...",
        view_inventory: "открыть инвентарь",
        inspect: "осмотреть ...",
      },
    },
    inspect_furniture: {
      items_list: 'предметы',
      pick_up: 'забрать',
      drop: 'выложить',
      inspect: 'осмотреть',
      inventory: 'инвентарь',
    },
  },
};

export default text;
