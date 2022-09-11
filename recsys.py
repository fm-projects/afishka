from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def sort_events(indices, similarities):
    results = list(dict(sorted(dict(zip(indices, similarities)).items(), key=lambda item: item[1], reverse=True)).keys())
    return results

def range_events(model, data, seen_indices):
    history = []
    sentence_embeddings = {}
    for id, s in data.items():
        sentence_embeddings[id] = model.encode(s)
    for idx in seen_indices:
        history.append(sentence_embeddings[idx])
    similarities = np.array(np.mean([(cosine_similarity([emb], list(sentence_embeddings.values())) * ratio).tolist()[0] 
                                    for emb, ratio in zip(history, np.linspace(0.5, 1.5, len(history)))], axis=0))
    result = sort_events(data.keys(), similarities)
    return result

def id_to_text(events, indices):
    texts = []
    for id in indices:
        texts.append(events[id])
    return texts

def recsys(model, data, seen):
    ranked = range_events(model, data, seen)
    ranked = id_to_text(data, ranked)
    return ranked

events = {  # index: name
    1: 'К 140-летию со дня рождения Игоря Стравинского',
    2: 'Тренировки в Спортивном парке',
    3: 'Закрытие Большого летнего музыкального фестиваля «Сириус»',
    4: 'Вечер серенад с «Виртуозами Москвы»',
    5: 'Музыкальная сборная Россия. Фортепианный марафон',
    6: 'Религиозные мотивы в советской постмодернистской литературе',
    7: 'Мастер-класс по гравюре на офортном станке',
    8: 'Дискуссия «Между мягкой обложкой и коллекционным изданием»',
    9: 'Лекция и презентация книги «Древнерусская криптография»',
    10: 'Путешествие с Запада на Восток',
    11: 'Виктор Цой и группа «Кино». Фотографии. Воспоминания. Презентация книги',
    12: 'Кинопоказ в Мурино',
    13: '«КАРМЕН». ТЕАТРАЛЬНЫЙ КОНЦЕРТ', 
    14: '«ГОЛОСА РУССКОГО ОРКЕСТРА». КОНЦЕРТ АНДРЕЕВСКОГО ОРКЕСТРА Дирижер – Дмитрий Хохлов',
    15: '«ТАНГО И ДЖАЗ»',
    16: 'ПРИНОШЕНИЕ ИЛЬЕ МУСИНУ. ОРКЕСТР КОСТРОМСКОЙ ФИЛАРМОНИИ', 
    17: 'АНСАМБЛЬ ДОНСКИХ КАЗАКОВ ИМ. АНАТОЛИЯ КВАСОВА',
    18: 'ОТКРЫТИЕ КОНЦЕРТНОГО СЕЗОНА. ХОР И ОРКЕСТР КАПЕЛЛЫ',
    19: 'МИР Российская Премьер-Лига. Тур 8. "Краснодар" - "Сочи". ',
    20: 'Футбол. Лига чемпионов. "Аякс" (Нидерланды) - "Рейнджерс" (Шотландия). '
}

model = SentenceTransformer('distiluse-base-multilingual-cased-v1')
seen_indices = [20, 2, 5, 7]
recsys(model, events, seen_indices)
