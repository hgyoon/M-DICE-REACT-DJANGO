import pandas as pd

# def geoid_loader():
#     data = pd.read_csv("data_derived_segments_geoid.csv")
#     data_list = []

#     for geoid in data['geometry']:
#         first_line = geoid.replace('LINESTRING (','').replace(')','')
#         first_line = first_line.split(', ')
#         final_list = []
#         for elem in first_line:
#             temp = [float(i) for i in elem.split()]
#             new_dict = {'lat':temp[1], 'lng':temp[0]}
#             final_list.append(new_dict)
#         data_list.append(final_list)
#     return data_list

def geoid_loader():
    data = pd.read_csv("data_derived_segments_geoid.csv")
    data_list = []
    for index, row in data.iterrows():
    #     print(row['color'], row['geometry'])
        color = row['color']
        geoid = row['geometry']
        first_line = geoid.replace('LINESTRING (','').replace(')','')
        first_line = first_line.split(', ')
        final_list = []
        for elem in first_line:
            temp = [float(i) for i in elem.split()]
            new_dict = {'lat':temp[1], 'lng':temp[0]}
            final_list.append(new_dict)
        pair_dict = {'color':color, 'geoid': final_list}
        data_list.append(pair_dict)
    return data_list